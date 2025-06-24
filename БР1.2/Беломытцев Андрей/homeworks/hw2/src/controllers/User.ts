import { Request, Response } from 'express'
import { AppDataSource } from "../AppDataSource"
import { User } from '../models/User'

const repository = AppDataSource.getRepository(User)

const create = async (req: Request, res: Response) => {
  try {
    res.json(await repository.save(req.body))
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

const get = async (req: Request, res: Response) => {
  try {
    res.json(await repository.find())
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

const getOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    res.json(await repository.findOneBy({ id }))
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const x = await repository.findOneBy({ id })
    if (!x) {
      res.status(404).json({ error: 'Not found' })
    }
    else {
      repository.merge(x, req.body)
      res.json(await repository.save(x))
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

const remove = async (req: Request, res: Response) => {
  try {
    const r = await repository.delete(parseInt(req.params.id))
    if (r.affected === 0) {
      res.status(404).json({ error: 'Not found' })
    }
    else{
      res.json(r)
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

const getByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email
    const user = await repository.findOne({ where: { email: email } })
    if (!user) {
      res.status(404).json({ message: 'Not found' })
    }
    else {
      res.json(user)
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export default { create, get, getOne, update, remove, getByEmail }