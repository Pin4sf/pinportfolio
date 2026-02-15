declare module "*.glsl" {
  const value: string;
  export default value;
}

interface Window {
  __lenis?: import("lenis").default | null;
}
