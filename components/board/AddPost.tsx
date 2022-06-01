import React, { FormEvent, useState } from "react"
import { IArticle } from "@/types"

type Props = {
    write: (e: FormEvent, FormData: any) => void
}

 const AddPost: React.FC<Props> = ({write}) => {
     const [formData, setFormData] = useState<IArticle>()
     const handleForm = (e: FormEvent<HTMLInputElement>): void => {
         setFormData(formData)
     }
    return(
        <form onSubmit={e => write(e, formData)}>
        <h1>제목</h1>
        <input onChange={handleForm} type="text" id="title"/>
        <h1>글내용</h1>
        <input onChange={handleForm} type="text" id="title"/>
        <button disabled={FormData === undefined ? true : false}>등록</button>
        </form>
    )
}
export default AddPost