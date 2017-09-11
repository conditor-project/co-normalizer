[![Build Status](https://travis-ci.org/conditor-project/co-normalizer.svg?branch=master)](https://travis-ci.org/conditor-project/co-normalizer)

co-normalizer
===============

## Présentation ##

Le module `co-normalizer` est un module permettant de *normaliser* des champs texte.

:warning: :warning: :warning: Dans notre contexte, **normaliser** signifie "homogénéiser ces champs en leur appliquant des pré-traitements prédéfinis". 

Par exemple, le champ titre va être modifié ainsi :

* suppression des espaces et autres caractères invisibles
* suppression des accents
* passage en minuscule de tous les caractères
* suppression des signes de ponctuation

### Fonctionnement ###

#### Structure d'entrée

Les champs requis dans le JSON d'entrée sont les suivants :

```
 {
 	....
    "titre": {
        "value" : "..."
    },
    "auteur": {
        "value" : "..."
    } ,
    "auteur_init":{
        "value" : "..."
    },
    "doi":{ 
    	"value": "...."
    },
    "issn":{ 
    	"value":"1234-5678"
    },
    "numero":{
    	"value":"n°1"
    },
    "volume":{
        "value":"v123"
    },
    "page":{
        "value":"page 1234"
    }
    ....
}
```

#### Structure de sortie

Pour chacun des champs d'entrée (voir ci-dessus), une sous-entrée `normalized` contenant la valeur normalisée est ajoutée. Par exemple :

```
{
 	....
 	"titre" : {
        "value" : "Mon titre préféré.",
        "normalized" : "montitreprefere"
    },
    "issn" : { 
    	"value" : "1234-5678",
    	"normalized" : "12345678"
    },
    "numero" : {
    	"value":"n°1",
    	"normalized" : "1"
    },
```

### Types de pré-traitemens disponibles

* `noespace` : suppression des espaces et autres caractères invisibles
* `noaccent` : suppression des accents
* `lowcase` : passage en minuscule de tous les caractères
* `nopunctuation` : suppression des signes de ponctuation
* `alphanum` : suppression de tous les caractères non-alphanumériques
* `num` : suppression de tous les caractères non-numériques
* `firstnum` : conservation de la première séquence numérique uniquement

#### Configuration des pré-traitemens

La liste des pré-traitements appliqués à chaque champ est définie dans le fichier de configuration [config.normalize.json](./config.normalize.json).

#### Fonctionnement interne

`co-normalizer` effectue ses traitements dans une fonction `doTheJob()` dédiée.

Dans notre cas minimal, le module effectue les opérations suivantes :

- récupération en entrée d'un `docObject` (objet JSON avec un champ `idIstex`), ainsi que d'une callback `cb`.
- normalisation des champs définis dans le fichier config.normalize.json
- Les éventuelles erreurs sont renvoyées en paramètre de la callback `cb`

## Utilisation ##

### Installation ###

Dépendances système :
  * NodeJS 4.0.0+

Commande d'Installation :
```bash
npm install
```

### Vérification du fonctionnement ###
Commande d'exécution des tests unitaires :
```bash
npm test
```

### Exécution ###

Comme pour tous les modules, la présente partie métier n'est pas destinée à être exécutée directement, puisqu'elle consiste uniquement à mettre à disposition une fonction `doTheJob`.

L'exécution se fera donc en appelant cette fonction depuis une instanciation d`li-canvas` ou indirectement depuis les tests unitaires.

## Annexes ##

### Arborescence ###

```
.
├── index.js                        // Point d'entrée, contenant la fonction doTheJob()
├── node_modules                    // Modules NPM
│   ├── ...
├── package.json                    // No comment
├── README.md
└── test                            // Fichiers nécessaires aux TU
    ├── dataset                     // rép de données de tests
    │   └── in
    |       └── test.json          // contient 2 docObjects pris en entrée des TU
    ├── run.js                      // point d'entrée des TU
    └──
```

### Codes d'erreur ###

