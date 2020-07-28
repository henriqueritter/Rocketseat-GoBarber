declare namespace Express {
  // Anexamos tipagens a uma biblioteca (no caso a biblioteca do Express em especial ao Request)
  export interface Request {
    user: {
      id: string;
    };
  }
}
