import {useState} from "react";
import AppLayout from "@/Layouts/AppLayout";
import {Link, router, useForm} from "@inertiajs/react";


export default function Index({id,auth}){


    const {data,setData}=useForm({
        user_id:auth.user.id,
        comment:'',
        post_id:id,

    })








    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        })

    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        router.post(route("comments.store"),data);

    }


    return (
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        <th> Jusu Komentaras</th>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <textarea className="form-control mb-3" value={data.comment} id="comment" onChange={handleChange} maxLength="100">Komentaras</textarea>
                            <button className="btn btn-success">Prideti</button>
                        </form>
                    </div>
                </div>
            </div>




        </AppLayout>
    );
}
