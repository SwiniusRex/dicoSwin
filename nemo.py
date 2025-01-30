"""
Nemo est la version de dicoSwin utilisable sur discord.
"""
import discord as d

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

client.run('1822f2ef472ab291790d5106cde9f9c71dabc7ff6c478a842e91aaef40f698fd')