
"""
convertit les données du fichier csv "dictionnaire" en un tableau
"""
import sys
import os

here = os.path.dirname(os.path.abspath(__file__))
dictionnaire = here + "/dictionnaire.csv"


def display_usage():
    print("===================================================================\n"
          "Usage:\n"
          "yanem <command> <arguments>\n"
          "-------------------------------------------------------------------\n"
          "traduction swinien-français : yanem s2f <mot swinien>\n"
          "traduction français-swinien : yanem f2s <mot français>\n"
          "-------------------------------------------------------------------\n"
          "ajouter un mot au dictionnaire : yanem add <type> <mot fr> <mot sw>\n"
          "retirer un mot du dictionnaire : yanem del <type> <mot fr> <mot sw>\n"
          "===================================================================\n")

def csv2list():
    csv = open(dictionnaire)
    elements = []
    for line in csv:
        elements.append(line[:-1].split(","))
    csv.close()
    return elements

"""
prend un mot en français et retourne la traduction en swinien depuis le csv.
"""
def search_fr(mot:str, elements:list):
    answers = []
    for i in range(len(elements)):
        if elements[i][1] == mot.lower():
            answers.append(elements[i])
    return answers

"""
Affiche les réponses de français vers swinien sur le terminal
"""
def display_answers_fr(answers:list):
    if len(answers) == 0:
        print("Le mot '{}' n'a pas été trouvé".format(sys.argv[2]))
    for answer in answers:
        print("{}| {}: {}".format(answer[0], answer[1], answer[2]))

"""
prend un mot en swinien et retourne la traduction en français depuis le csv.
"""
def search_sw(mot:str, elements:list):
    answers = []
    for i in range(len(elements)):
        if elements[i][2] == mot.lower():
            answers.append(elements[i])
    return answers

"""
Affiche les réponses de swinien vers français sur le terminal
"""
def display_answers_sw(answers:list):
    if len(answers) == 0:
        print("Le mot '{}' n'a pas été trouvé".format(sys.argv[2]))
    else:
        for answer in answers:
            print("{}| {}: {}".format(answer[0], answer[2], answer[1]))


def line_exists(type:str, fr:str, sw:str):
    for element in csv2list():
        if element == [type,fr,sw]:
            return True
    return False


def add_word(type:str, fr:str, sw:str):
    if line_exists(type,fr,sw):
        print("La ligne que vous tentez d'enregistrer est déja dans le fichier.")
        pass
    else:
        with open(dictionnaire, "r+") as csv:
            csv.read()
            csv.write("{},{},{}\n".format(type,fr,sw))


def remove_word(type:str, fr:str, sw:str):
    if line_exists(type,fr,sw):
        with open(dictionnaire, "r+") as f:
            d = f.readlines()
            f.seek(0)
            for i in d:
                if i != "{},{},{}\n".format(type,fr,sw):
                    f.write(i)
            f.truncate()



if __name__ == "__main__":
    if len(sys.argv) < 2 :
        display_usage()
    else:
        if sys.argv[1] == "f2s" :
            if len(sys.argv) >= 3:
                display_answers_fr(search_fr(sys.argv[2], csv2list()))
            else :
                print("err : mising arguments")
                display_usage()

        elif sys.argv[1] == "s2f" :
            if len(sys.argv) >= 3:
                display_answers_sw(search_sw(sys.argv[2], csv2list()))
            else :
                print("err : missing arguments")
                display_usage()

        elif sys.argv[1] == "add" :
            if len(sys.argv) >= 5:
                add_word(sys.argv[2], sys.argv[3], sys.argv[4])
            else:
                print("err : missing arguments")
                display_usage()

        elif sys.argv[1] == "del" :
            if len(sys.argv) >= 5:
                remove_word(sys.argv[2], sys.argv[3], sys.argv[4])
            else :
                print("err : missing arguments")
                display_usage()

        elif sys.argv[1] == "-h" or sys.argv[1] == "help":
            display_usage()

        else :
            print("err : unknown command")
            display_usage()
