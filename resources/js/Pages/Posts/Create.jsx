import AppLayout from "@/Layouts/AppLayout";

import {useState} from "react";
import {router, useForm} from "@inertiajs/react";

export default function Create(props){


    const {data,setData, errors, setError, clearErrors}=useForm({
        name:'',
        comment:'',
        price:'',
        photo:'',
        city:'',
        category_id:props.category_id,




    })
    const [isDirtyField, setDirtyField]=useState({
        name:false,
        city:false,

    })
    const validate=()=>{
        if(isDirtyField.name) {
            if (data.name.length >= 3) {
                clearErrors("name")
            } else {
                setError("name", "Pavadinimas yra Privalomas laukas ir ne trumpesnis nei 3 simb")
            }
        }

            if(isDirtyField.city) {
                if (data.city.length >= 3) {
                    clearErrors("city")
                } else {
                    setError("city", "Miestas yra privalomas laukas ir ne trumpesnis nei 3 simb")
                }
            }
        }

    const handleBlur=(event)=>{
        isDirtyField[event.target.id]=true;
        setDirtyField({
            ...isDirtyField,
            [event.target.id]:true
        });
        validate()

    }



    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        })

    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        router.post(route("posts.store"),data);

    }

    return(
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Prideti skelbima
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label">Pavadinimas</label>
                                <input className={"form-control "+(errors.name!=null?"is-invalid":"")} type="text" id="name" onChange={handleChange} onBlur={handleBlur} value={data.name}/>
                                <div className="invalid-feedback">
                                    {errors.name}
                                </div>
                            </div>


                            <div className="mb-3">
                                <label className="form-label">Kaina</label>
                                <input className="form-control " type="text" id="price" onChange={handleChange} value={data.price}/>

                            </div>

                            <div className="mb-3">
                                <label className="form-label">Nuotrauka</label>
                                <input className="form-control" type="file" id="photo" onChange={(event)=>{
                                    setData({
                                        ...data,
                                        photo: event.target.files[0]
                                    })}
                                } />

                            </div>

                            <div className="mb-3">
                                <label className="form-label">Miestas</label>
                                <input className={"form-control "+(errors.city!=null?"is-invalid":"")} type="text" id="city" onChange={handleChange} onBlur={handleBlur} value={data.city}/>
                                <div className="invalid-feedback">
                                    {errors.city}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Komentaras (Neprivaloma)</label>
                                    <div>
                                <textarea className="form-control" value={data.comment} id="comment" onChange={handleChange} maxLength="100">Komentaras</textarea>
                                    </div>
                            </div>
                            <button className="btn btn-success">Prideti</button>
                        </form>

                    </div>
                </div>
            </div>




        </AppLayout>
    )
}
