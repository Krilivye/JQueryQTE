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
key:'a' //ou key:['a','b',...]
time:5
delay:5
}
```
