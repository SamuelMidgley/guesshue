import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { useRegisterMutation } from '@/services/auth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ColorInput } from '@/components/ui'
import { randomHexColorCode } from '@/lib/utils'
import { useState } from 'react'

const formSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(2).max(50),
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
    color1: z.string(),
    color2: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

export function Register() {
  const [activeTab, setActiveTab] = useState('account')
  const { mutate } = useRegisterMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      color1: randomHexColorCode(),
      color2: randomHexColorCode(),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    mutate(values)
  }

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center px-4">
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Register</h2>
          <p>Fill in your details below to register for an account</p>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={(newTab) => setActiveTab(newTab)}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="personalisation">Personalisation</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl">Account</CardTitle>
                <CardDescription>
                  Fill in your details below to register for an account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="w-full"
                      onClick={() => setActiveTab('personalisation')}
                    >
                      Next Step
                    </Button>
                  </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="underline">
                    Login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="personalisation">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl">Personalisation</CardTitle>
                <CardDescription>Personalise your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="color1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color 1</FormLabel>
                          <FormControl>
                            <ColorInput
                              color={form.getValues('color1')}
                              setColor={(newColor: string) =>
                                form.setValue('color1', newColor)
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="color2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color 2</FormLabel>
                          <FormControl>
                            <ColorInput
                              color={form.getValues('color2')}
                              setColor={(newColor: string) =>
                                form.setValue('color2', newColor)
                              }
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Register
                    </Button>
                  </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="underline">
                    Login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
