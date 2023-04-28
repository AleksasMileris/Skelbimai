import {useState} from "react";
import AppLayout from "@/Layouts/AppLayout";
import {Link, router} from "@inertiajs/react";

export default function Index({ auth, categories,fil,ord}){

    const categoriesList=[];


    const handleDelete=(event)=>{
        router.delete(route("categories.destroy",event.target.value));
    }
    categories.forEach((category)=>{


        categoriesList.push(<tr key={category.id}>
            <td>{category.name}</td>

            <td><Link className={"btn btn-info m-2"} href={route('categories.show',category.id)}>Skelbimai</Link></td>





            {auth.user != null && auth.user.type == 1?
                <td><Link className="btn btn-primary m-2" href={route('categories.edit',category.id)}>Redaguoti</Link >

                <button className="btn btn-danger" onClick={handleDelete} value={category.id}>Trinti</button > </td>
                :<td></td>

            }

        </tr>)
    });


    const [filter,setFilter]=useState({
        name:fil.name,


    });

    const handleChange=(event)=>{
        setFilter({
            ...filter,
            [event.target.id]:event.target.value
        })

    }
    const handleFilter=()=>{
        router.post(route("categories.filter"),filter);
    }



    const [order, setOrder]=useState({
        field:"name",
        dir:1
    });





    categories.sort(
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
    return (
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header">
                        Kategorijos
                    </div>
                    <div className="card-body">
                        {auth.user != null && auth.user.type == 1 ?
                            <Link className="btn btn-success float-end" href={route("categories.create")}>Pridėti nauja Kategorija</Link>:""
                        }

                        <table className="table">
                            <thead>
                            <tr>
                                <th>
                                    <input type="text" id="name" className="form-control"  onChange={handleChange} value={filter.name}/>
                                </th>
                                <th><button className="btn btn-success" onClick={handleFilter}>Ieškoti</button></th>
                            </tr>
                            <tr>
                                <th>
                                    <Link href={route("categories.order",['name',ord.field=='name'&&ord.dir=="ASC"?"DESC":"ASC"])}>Pavadinimas</Link>


                                </th>



                                {auth.user != null && auth.user.type == 1?
                                <th colSpan="2" className="text-center">Veiksmai</th>:""}

                            </tr>
                            </thead>
                            <tbody>
                            {categoriesList}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>




        </AppLayout>
    );
}
