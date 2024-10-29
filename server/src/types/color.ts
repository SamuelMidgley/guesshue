export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface Vote {
  id: string;
  name: string;
  isCorrect: boolean;
}

export interface ColorGame {
  colorOptions: string[];
  correctColor: string;
  votes: Vote[];
}
