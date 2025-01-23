import React from 'react';
import Loader from './loader';
import { loaderColorsRed } from '../ressources/ColorVar';
import { useState, useEffect } from 'react';


import '../styling/Presentation.css';


const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return windowWidth;
  };

const Presentation = ({ setActiveComponent }) => {
    const windowWidth = useWindowWidth();

    return (
        <div className='pres-pack'>
      {windowWidth >= 1400 && <Loader />}
      <div className="presentation-container">
                <h1>Bienvenue sur RH Pro</h1>
                <p>
                    RH Pro est une application innovante conçue pour simplifier 
                    le processus de lecture et d'analyse des CVs.
                    <br />Vous trouverez les fonctionnalités de l'application sur le bouton ci-dessus 
                </p>
                <h2>Fonctionnalités</h2>
                <ul>
                <h3><li>Comparateur de Cv pour mission</li></h3>
                </ul>
                <ul>
                <h3><li>Rédacteur de mail pour Interview / Refus</li></h3>
                </ul>
                <h2>Comment ça marche ?</h2>
                <ul>
                <h3 onClick={() => setActiveComponent('CvReader')}>Comparateur de CV pour mission</h3>
                    <li>Entrez le CV du candidat</li>
                    <li>Ajouter un screen de la mission ou un résumé textuel</li>
                    <li>Appuyez sur le bouton "Comparer"</li>
                </ul>
                <ul>
                <h3>Rédacteur de mail pour Interview / Refus</h3>
                    <li>Entrez le CV du candidat</li>
                    <li>Ajouter le poste pour lequel le candidat a postulé</li>
                    <li>Appuyez sur le bouton "Rédiger"</li>
                </ul>
            </div>
            {windowWidth >= 1400 && <Loader colors={loaderColorsRed}/>}
            </div>

    );
};

export default Presentation;