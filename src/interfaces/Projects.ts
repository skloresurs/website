export default interface iProject {
  title: string;
  location: string;
  glass: string;
  year: number;
  images: Array<{
    url: string;
    width: number;
    height: number;
  }>;
}
