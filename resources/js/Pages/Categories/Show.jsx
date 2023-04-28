import {useState} from "react";
import AppLayout from "@/Layouts/AppLayout";
import {Link, router, useForm} from "@inertiajs/react";


export default function Show({category,auth,fil,posty}){







    const categoriesPostsList=[];

    const handleDelete=(event)=>{
        router.delete(route("posts.destroy",event.target.value));
    }

    const handleChange=(event)=>{
        setData({
            ...data,
            [event.target.id]:event.target.value
        })

    }





    (posty!=null?posty:category.posts).forEach((post)=>{



        categoriesPostsList.push(

            <tr key={post.id}>

                <td>{post.name}</td>
                <td>{post.price} /Eur</td>

                <td><Link className="btn btn-primary m-2" href={route('posts.show',post.id)}>Daugiau</Link ></td>









        </tr>

    )
    });



    const [order, setOrder]=useState({

        field:"price",
        dir:1
    });



    let posts=category.posts

    posts.sort(
        (a, b)=>{
            if(a[order.field]>b[order.field]){
                return 1* order.dir;
            }

            if(a[order.field]<b[order.field]){
                return -1*order.dir;
            }
            return 0
        }
    );
    const [filter,setFilter]=useState({
        name:fil.name,
        category_id:category.id

    });

    const filterChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value
        })

    }

    const handleFilter=()=>{
      router.post(route("posts.filter"),filter);
    }



    return (
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Kategorijos: {category.name} skelbimai
                    </div>
                    <div className="card-body">
                        {auth.user != null && auth.user.type == 1 ?
                            <Link className="btn btn-success float-end" href={route("posts.create",category.id)}>Pridėti nauja skelbima</Link>:""
                        }

                        <table className="table table-sm">
                            <thead>
                            <tr>
                                <th>
                                    <label className='form-label'>Ieskoti pagal pavadinima</label>
                                    <input type="text" id="name" className="form-control"  onChange={filterChange} value={filter.name}/>
                                </th>
                                <th><button className="btn btn-success" onClick={handleFilter}>Ieškoti</button></th>
                            </tr>
                            <tr>
                                <th>
                                   Pavadinimas



                                </th>

                                <th colSpan="2">
                                    <span className='text-primary' onClick={ ()=>{setOrder({field:"price",dir:order.field=='price'&&order.dir==1?-1:1})}}>Kaina</span>
                                </th>








                            </tr>

                            </thead>
                            <tbody>
                            {categoriesPostsList}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>




        </AppLayout>
    );
}
