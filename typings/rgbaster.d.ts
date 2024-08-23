// //图片主题色工具类型
declare module "rgbaster" {
  interface Opts {
    ignore?: string[];
    scale?: number;
    skipTransparentPixels?: boolean;
  }
  export default function (src: string, opts?: Opts): Promise<{
    color: string;
    count: number;
  }[]>;

}
