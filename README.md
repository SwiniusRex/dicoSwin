# dicoSwin

## Dictionnaire de traduction swinien-français en ligne de commande

Fait par Éntekallis/SwiniusRex 
*dernière màj le 08-07-2024*

## Installation

*Prérequis :*
Python ou Python3
(OS linux de préférence) 

*Installation:*

(dans le dossier avec le programme python)
`python -m venv .venv`
`source .venv/bin/activate`


*Utilisation*

`python3 main.py s2f [mot en swinien]` : pour trouver la traduction d'un mot swinien en français

`python3 main.py f2s [mot en français]` : pour l'inverse

`python3 main.py add [type de mot*] [mot en français] [mot en swinien]` : pour ajouter une entrée au dictionnaire

`python3 main.py del [type de mot*] [mot en français] [mot en swinien]` : pour effacer une entrée du dictionnaire

*Je recommande l'ajout d'un alias dans le .bashrc pour faciliter la commande, de type : `alias dicoswin="python3 ~/.../dossier/main.py"`
