# dicoSwin

Ce projet est un dictionnaire de traduction swinien-français en ligne de commande.
Le dictionnaire est [présent](./dictionnaire.csv) dans le repo au format csv.

## Installation 

> *Prérequis :*
Python ou Python3
(OS linux de préférence) 

## Cloner
```bash
git clone https://github.com/SwiniusRex/dicoSwin.git dicoSwin
```

## Setup Venv
Si vous souhaitez mettre en place un *virtual environment* (venv), appliquez les commandes suivantes, sinon sautez directement à l'installation des [dépendances](#dépendances).

(dans le dossier avec le programme python)
```bash
python -m venv .venv
```

### Linux
```bash
source .venv/bin/activate
```
### Windows
```bash
.\.venv\Scripts\activate
```

## Dépendances
> *Pas de dépendance pour l'instant.*


## Utilisation

`python3 main.py s2f [mot en swinien]` : pour trouver la traduction d'un mot swinien en français

`python3 main.py f2s [mot en français]` : pour l'inverse

`python3 main.py add [type de mot*] [mot en français] [mot en swinien]` : pour ajouter une entrée au dictionnaire

`python3 main.py del [type de mot*] [mot en français] [mot en swinien]` : pour effacer une entrée du dictionnaire

*Il est recommandé d'ajouter un alias dans le bashrc (ou équivalent) pour faciliter la commande, de type : `alias dicoswin="python3 ~/path/to/main.py"`
