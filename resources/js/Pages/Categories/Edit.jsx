import AppLayout from "@/Layouts/AppLayout";

import {useState} from "react";
import {router, useForm} from "@inertiajs/react";

export default function Create(props){



    const {data,setData,errors, setError, clearErrors}=useForm(props.category)

    const [isDirtyField, setDirtyField]=useState({
        name:false,


    })

    const validate=()=>{
        if(isDirtyField.name) {
            if (data.name.length >= 3) {
                clearErrors("name")
            } else {
                setError("name", "Pavadinimas yra Privalomas laukas ir ne trumpesnis nei 3 simb")
            }
        }


    }


    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        })
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        router.put(route("categories.update", data.id),data);

    }
    const handleBlur=(event)=>{
        isDirtyField[event.target.id]=true;
        setDirtyField({
            ...isDirtyField,
            [event.target.id]:true
        });
        validate()

    }

    return(
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Atnaujinti Kategorija
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






                            <button className="btn btn-success">Atnaujinti</button>
                        </form>

                    </div>
                </div>
            </div>




        </AppLayout>
    )
}
