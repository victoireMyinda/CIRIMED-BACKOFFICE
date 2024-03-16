import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Leftbar.css";
import { FaCogs, FaEvernote, FaGraduationCap, FaHospital, FaInfo, FaPodcast, FaRegListAlt, FaTasks } from "react-icons/fa"
import { FiBarChart, FiImage, FiMenu } from 'react-icons/fi';
import { GoTextSize } from "react-icons/go"
import { GrUserAdmin } from "react-icons/gr";

const Leftbar = () => {
    return (
        <div className='leftbar'>
            <div className='menu-item'>
                <NavLink to="/dashboard">
                    <div className='item'>
                        <FiBarChart />
                        <span>Dashboard</span>
                    </div>
                </NavLink>

                <NavLink to="/categories">
                    <div className='item'>
                        <FaRegListAlt />
                        <span>Catégorie Evénements</span>
                    </div>
                </NavLink>

                <NavLink to="/categoriesActus">
                    <div className='item'>
                        <FiMenu />
                        <span>Catégorie Formations</span>
                    </div>
                </NavLink>

                <NavLink to="/actualites">
                    <div className='item'>
                        <FaTasks />
                        <span>Formations</span>
                    </div>
                </NavLink>

                <NavLink to="/ecole">
                    <div className='item'>
                        <FaEvernote />
                        <span>Evenements</span>
                    </div>
                </NavLink>

                <NavLink to="/posts">
                    <div className='item'>
                        <FaPodcast />
                        <span>Posts</span>
                    </div>
                </NavLink>

                <NavLink to="/medias">
                    <div className='item'>
                        <FiImage />
                        <span>Médiathèque</span>
                    </div>
                </NavLink>

                <NavLink to="/documents">
                    <div className='item'>
                        <GoTextSize />
                        <span>Documents Texts</span>
                    </div>
                </NavLink>
                <NavLink to="/users">
                    <div className='item'>
                        <GrUserAdmin />
                        <span>Utilisateurs</span>
                    </div>
                </NavLink>
                <NavLink to="/config">
                    <div className='item'>
                        <FaCogs />
                        <span>Configuration</span>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Leftbar