import express, { query, request, response } from 'express';
import { PrismaClient } from '@prisma/client';
import { converHourStringToMinute } from './utils/convert-hour-string-to-minute';
import { converMinuteToHourString } from './utils/convert-minutes-to-hour-string';
import cors from 'cors'

const app = express()

const prisma = new PrismaClient({
    log: ['query']
})

app.use(express.json())
app.use(cors())

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })
    return response.json(games);
})

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            useVoiceChannel: body.useVoiceChannel,
            discord: body.discord,
            yearsPlaying: body.yearsPlaying,
            hourStart: converHourStringToMinute(body.hourStart),
            HourEnd: converHourStringToMinute(body.HourEnd),
            weekDays: body.weekDays.join(','),
        }
        
    })
    return response.status(201).json(ad);
})

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            HourEnd: true,
        },
        where: {
            gameId: gameId
        },
        orderBy: {
            creatAt: 'desc'
        }
    })
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: converMinuteToHourString(ad.hourStart),
            HourEnd: converMinuteToHourString(ad.HourEnd)

        }
    }))

    
})

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })
    return response.json({
        discord: ad.discord,
    })

    
})

app.listen(3333);