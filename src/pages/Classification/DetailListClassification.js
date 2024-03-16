import * as React from 'react';

export default function DetailListClassification(props) {

    let data = props.data;

    return (
        <>
            <table className='table table-striped'>
                <tbody>
                    <tr>
                        <td className='p-3' colSpan={"2px"}> Détail de {data && data.title}</td>
                    </tr>

                    <tr>
                        <td>Titre</td>
                        <td>{data && data.title}</td>
                    </tr>

                    <tr>
                        <td>Description</td>
                        <td>{data && data.description}</td>
                    </tr>

                    <tr>
                        <td>Prix ($)</td>
                        <td>{data && data.price}</td>
                    </tr>

                    <tr>
                        <td>Date de lancement</td>
                        <td>{data && data.dateDebut}</td>
                    </tr>

                    <tr>
                        <td>Date de fermeture</td>
                        <td>{data && data.dateFin}</td>
                    </tr>
                </tbody>
            </table>

            <span>Vidéo </span>
            <div>
                <iframe
                    width={"100%"}
                    height="300"
                    src={data && data.link}
                    target="_parent"
                    allow="accelerometer; autoplay; clipboard-write;
    encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={data && data.title}
                    name="inframe"
                >
                </iframe>
            </div>
        </>
    );
}