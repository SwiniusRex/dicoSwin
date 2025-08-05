"""
Nemo est la version de dicoSwin utilisable sur discord.
"""
import os
import discord as d

here = os.path.dirname(os.path.abspath(__file__))

intents = d.Intents.default() #Voir doc

client = d.Client(intents=intents) #initailisation du Client discord

@client.event
async def on_ready():
    print("Salut, Halune ! Je suis Nemo, je traduis les mots swiniens indexés en français et inversement")

async def on_message(message):
    if "Salut" in message:
        print("Salut !")
    elif "Halune" in message:
        print("Halune !")

codex = open(os.path.join(here,"codex.swin"))
botcode = codex.read(200)
print(botcode)


client.run(botcode)
