export default interface iPost {
  id: number;
  title: string;
  description: string;
  category: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  content: string | null;
  video: string | null;
}
