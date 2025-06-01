import 'reflect-metadata';
import express, { Request, Response } from "express"
import dataSource from "./config/data-source"
import { useSwagger } from './swagger';

import {
    Param,
    Body,
    Get,
    Post,
    Patch,
    UseBefore,
    Req,
    Res,
} from 'routing-controllers';
import { useExpressServer } from 'routing-controllers';
import { UsersController } from './controllers/user';
import { CharactersController } from './controllers/character';
import { CharacterDescriptionsController } from './controllers/characterDescription';
import { ChatHistorysController } from './controllers/chatHistory';
import { ConditionsController } from './controllers/condition';
import { EdgesController } from './controllers/edge';
import { EffectsController } from './controllers/effect';
import { EffectToCharactersController } from './controllers/effectToCharacter';
import { ItemsController } from './controllers/item';
import { ItemToCharactersController } from './controllers/itemToCharacter';
import { MessagesController } from './controllers/message';
import { RacesController } from './controllers/race';
import { RollsController } from './controllers/roll';
import { SkillsController } from './controllers/skill';
import { SkillToCharactersController } from './controllers/skillToCharacter';

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

    
// create and setup express app
let app = express()
app.use(express.json())

const options = {
    routePrefix: "/api",
    controllers: [
        UsersController,
        CharactersController,
        CharacterDescriptionsController,
        ChatHistorysController,
        ConditionsController,
        EdgesController,
        EffectsController,
        EffectToCharactersController,
        ItemsController,
        ItemToCharactersController,
        MessagesController,
        RacesController,
        RollsController,
        SkillsController,
        SkillToCharactersController,
    ],
    validation: true,
    classTransformer: true,
    defaultErrorHandler: true,
};

app = useExpressServer(app, options);
app = useSwagger(app, options);


app.listen(3000, () => console.log("Server started on http://localhost:3000"));