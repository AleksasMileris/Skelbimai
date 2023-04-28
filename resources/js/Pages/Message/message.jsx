
import AppLayout from "@/Layouts/AppLayout";
import {Link} from "@inertiajs/react";


export default function Message(){


    return (
        <AppLayout>


            <div className="col-md-12 mt-5">
                <div className="card">
                    <div className="card-header text-center">
                        Pranešimas
                    </div>
                    <div className="card-body text-center">
                        <h1 className='text-danger'>Tokia kategorija jau egzistuoja</h1>
                        <Link className="btn btn-danger float-end mt-5" href={route('categories.index')}>Atgal</Link>
                    </div>
                </div>
            </div>




        </AppLayout>
    );
}
