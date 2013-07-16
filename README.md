Bibliothèque sur le système QTE
===============================

<pre>
                          ___                   ___     
                         /  /\     ___         /  /\    
                        /  /::\   /__/\       /  /::\   
                       /__/:/\:\  \  \:\     /  /:/\:\  
                       \  \:\ \:\  \__\:\   /  /::\ \:\ 
                        \  \:\ \:\ /  /::\ /__/:/\:\ \:\
                         \  \:\/://  /:/\:\\  \:\ \:\_\/
                          \__\:://  /:/__\/ \  \:\ \:\  
                          /  /://__/:/       \  \:\_\/  
                         /__/:/ \__\/         \  \:\    
                         \__\/                 \__\/                           
</pre>

Cette bibliothèque permet d'associer un événement à un élément du DOM 
    - à un temps donnée
    - pour une certaine durée

Le système se veux le plus configurable possible.


La syntaxe est la suivante:

```javascript
$('selecteur').qte();
```

les options se passent sous la forme d'un objet literal comportant les attributs suivants:

```javascript
{
    key:'a', //ou key:['a','b',...]
    time:5, // Temps avant que le QTE ne démarre
    delay:5, //Durée de vie du QTE
    failOnDelay:true, //Lance la fonction fail si la durée de vie du QTE est dépassé
    max_attempt:1, // Nombre de tentative possible
    hover:false, // Précise si le QTE est activable uniquement au survol de l'élément.
    //Customisations des fonctions 'évènements'
    delaywatcher:false,
    fail: failfunction,
    fail_attempt: failAttempsFunction,
    succes: succesfunction,
    display:displayfunction
}
```

Le fichier src/html/qte-game.html contient un example de jeux.
Le script de démo étant src/html/qte-game.js

Le système permet de chainer différents qte:

```javascript
$('selecteur').qte({key:'a'}).qte({key:'b'})
```
Dans ce cas le joueur ne peux remplir qu'une seul condition (soit a, soit b)
