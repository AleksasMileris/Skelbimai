
import AppLayout from "@/Layouts/AppLayout";
import {Link, router, useForm} from "@inertiajs/react";


export default function Show({post,auth,liked}){


    const {data,setData}=useForm({
        name:'',
        comment:'',
        price:'',
        photo:'',
        city:'',
        category_id:''




    })






    const handleDelete=(event)=>{
        router.delete(route("posts.destroy",event.target.value));
    }





    return (
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Skelbimo: {post.name} informacija
                    </div>
                    <div className="card-body">


                        <table className="table table-sm">
                            <thead>
                            <tr>
                                <th>
                                    Pavadinimas



                                </th>
                                <th>Komentaras</th>
                                <th>
                                    <span className='text-primary' >Kaina</span>
                                </th>

                                <th>Nuotrauka</th>
                                <th>Miestas</th>






                            </tr>


                            </thead>
                            <tbody>
                            <tr key={post.id}>

                                <td>{post.name}</td>

                                <td>{post.comment}</td>
                                <td>{post.price} /Eur</td>
                                <td>{post.photo && <img alt="foto" width="80px" src={"/storage/posts/"+post.photo} />}</td>
                                <td>{post.city}</td>



                            </tr>


                            </tbody>

                        </table>
                        <table className="table table-sm">
                            <thead>

                            <tr>{auth.user != null && auth.user.type == 1?
                                <th  className="">Veiksmai</th>:""}
                            <th>Palikti komentara</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr>

                                {auth.user != null && auth.user.type == 1?
                                    <td><Link className="btn btn-primary m-2" href={route('posts.edit',post.id)}>Redaguoti</Link >

                                        <button className="btn btn-danger" onClick={handleDelete} value={post.id}>Trinti</button > </td>
                                    :""

                                }
                                <td><Link className="btn btn-warning m-2" href={route('comments.note',post.id)}>Komentaras</Link ></td>
                                <td><Link className="btn btn-info m-2" href={route('comments.like',[post.id,auth.user.id])}>{liked == 1?"Nepatinka":"Patinka"}</Link ></td>
                            </tr>

                            </tbody>

                        </table>

                    </div>
                </div>
            </div>




        </AppLayout>
    );
}
