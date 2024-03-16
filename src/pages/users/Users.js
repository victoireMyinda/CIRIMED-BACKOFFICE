import React, { useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Leftbar from '../../components/leftbar/Leftbar';
import Navbar from '../../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import ListUser from './ListUser';

const Users = () => {

    // const { userConnected } = useContext(ContextApp);

    const users = useSelector((state) => state.users);

    const [valueSearch, setValueSearch] = useState('');


    return (
        <>
            <Navbar />
            <div className='mainApp'>
                <div className='contentMain'>
                    <div className='contentLeftBar'>
                        <Leftbar />
                    </div>
                    <div className='contentApp'>
                        <div className='alert alertInputSearch'>
                            <div className='col-sm-8'>
                                <div className="input-group">
                                    <input
                                        type="search"
                                        id="form1"
                                        placeholder='Rechercher...'
                                        className="form-control"
                                        onChange={(e) => setValueSearch(e.target.value)}
                                    />
                                    <FaSearch color='#1976d2' />
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                <Link to='add'>
                                    <button className='btn btn-primary'>
                                        <FaPlus />
                                        Ajouter
                                    </button>
                                </Link>
                            </div>
                        </div>


                        <div className='col-sm-12 tableData'>
                            <ListUser
                                data={users}
                                valueSearch={valueSearch}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users