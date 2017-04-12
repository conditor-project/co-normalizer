li-doTheJob
===============

## Présentation ##

Le module **co-normalizer** est un module permettant de normaliser des champs texte.

### Fonctionnement ###

`co-normalizer` effectue ses traitements dans une fonction `doTheJob()` dédiée.

Dans notre cas minimal, le module effectue les opérations suivantes :
  * récupération en entrée d'un `docObject` (objet JSON avec un champ `idIstex`), ainsi que d'une callback `cb`.
  * normalisation des champs définis dans le fichier config.normalize.json
  * Les éventuelles erreurs sont renvoyées en paramètre de la callback `cb`

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

