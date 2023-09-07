import { TinaMarkdown } from "tinacms/dist/rich-text";

interface iProps{
    body: any
}

export default function StyledPostComponents({body}: iProps): JSX.Element {
    return <TinaMarkdown components={{
        h2: (props) => <h2 className='mb-3 text-center text-3xl font-semibold'>{props?.children}</h2>,
        h3: (props) => <h3 className='mb-3 text-center text-2xl  font-semibold'>{props?.children}</h3>,
        h4: (props) => <h4 className='mb-3 text-center text-xl  font-semibold'>{props?.children}</h4>,
        h5: (props) => <h5 className='mb-3 text-center text-lg  font-semibold'>{props?.children}</h5>,
        h6: (props) => <h6 className='mb-3 text-center  font-semibold'>{props?.children}</h6>,
        p: (props) => <p className='mb-3'>{props?.children}</p>,
        img: (props) => <img src={props?.url} alt={props?.alt} className='mx-auto mb-3 max-w-lg'/>,
        ul: (props) => <ul className='mb-3 ml-5 list-disc'>{props?.children}</ul>,
        ol: (props) => <ol className='mb-3 ml-5 list-decimal'>{props?.children}</ol>
    }} content={body} />
}