export default interface iVacancy {
  id: number;
  title: string;
  description: string;
  content: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  video: string | null;
}
