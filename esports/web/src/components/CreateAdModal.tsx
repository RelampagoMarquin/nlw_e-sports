import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from "axios";
import { Input } from './Form/Input';
import {
    Check,
    GameController
} from 'phosphor-react';
import {
    FormEvent,
    useEffect,
    useState
} from 'react';

interface Game {
    id: string;
    title: string;
}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([])

    const [weekDays, setWeekDays] = useState<string[]>([])

    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(response => {
                setGames(response.data)
            })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement)

        const data = Object.fromEntries(formData)

        if(!data.name){
            return
        }
        try {
            axios.post(`http://localhost:3333/games/${data.game}/ads`, {
            "name": data.name,
            "discord": data.discord,
            "useVoiceChannel": useVoiceChannel,
            "yearsPlaying": Number(data.yearsPlaying),
            "hourStart": data.hourStart,
            "HourEnd": data.HourEnd,
            "weekDays": weekDays.map(Number)
        })

        alert('Anúncio cadastrado com sucesso!')
        } catch (error) {
            console.log(error)
            alert('Erro ao cadastrar Anúncio!')
        }
        
    }
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-blue-25'>
                <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="game" className='font-semibold'> Qual o game?</label>
                        <select
                            name='game'
                            id="game"
                            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                        >
                            <option disabled defaultValue="" value="">Selecione o game que deseja jogar</option>
                            {games.map(game => {
                                return <option key={game.id} value={game.id}>{game.title}</option>
                            })}
                        </select>
                        {/* <Select.Root>
                            <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm flex placeholder:text-zinc-500 appearance-none">
                                <Select.Value placeholder='Selecione o game que deseja jogar'>
                                </Select.Value>
                                <Select.Icon />
                            </Select.Trigger>
                            <Select.Portal>
                                <Select.Content>
                                    <Select.Viewport>
                                        return {games.map(game => {
                                            <Select.Item key={game.id} value={game.id}>
                                                <Select.ItemText>{game.title}</Select.ItemText>
                                            </Select.Item>
                                        })}
                                    </Select.Viewport>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root> */}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name" className='font-semibold'> Seu nome (ou nickname)</label>
                        <Input name='name' id='name' placeholder='Como te chamam dentro do game?' />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2 '>
                            <label htmlFor="yearsPlaying" className='font-semibold'> Joga a quantos anos?</label>
                            <Input name='yearsPlaying' id='yearsPlaying' type="number" placeholder='Tudo bem ser ZERO' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord" className='font-semibold'> Qual seu discord?</label>
                            <Input name='discord' id='discord' type="text" placeholder='Usuario#0000' />
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="weekDays" className='font-semibold'>Quando Costuma jogar?</label>

                            <ToggleGroup.Root
                                type='multiple'
                                className='grid grid-cols-4 gap-2'
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                <ToggleGroup.Item
                                    value='0'
                                    title='Domingo'
                                    className={`w-8 h-8 rounded  ${weekDays.includes("0") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    D
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='1'
                                    title='Segunda'
                                    className={`w-8 h-8 rounded  ${weekDays.includes("1") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='2'
                                    title='Terça'
                                    className={`w-8 h-8 rounded  ${weekDays.includes("2") ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='3'
                                    title='Quarta'
                                    className={`w-8 h-8 rounded  ${weekDays.includes("3") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='4'
                                    title='Quinta'
                                    className={`w-8 h-8 rounded  ${weekDays.includes("4") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='5'
                                    title='Sexta'
                                    className={`w-8 h-8 rounded  ${weekDays.includes("5") ? 'bg-violet-500' : 'bg-zinc-900'}`}>S
                                </
                                ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='6'
                                    title='Sábado'
                                    className={`w-8 h-8 rounded  ${weekDays.includes("6") ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>

                        </div>
                        <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor="hourStart" className='font-semibold'> Qual horário do dia?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input name='hourStart' id='hourStart' type="time" placeholder='De' />
                                <Input name='HourEnd' id='hourEnd' type="time" placeholder='Até' />
                            </div>
                        </div>
                    </div>

                    <label className='mt-2 flex gap-2 items-center text-sm'>
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if (checked === (true)) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }}
                            className='w-6 h-6 p-1 bg-zinc-900'
                        >
                            <Checkbox.Indicator>
                                <Check className='w-4 h-4 text-emerald-400' />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar
                        </Dialog.Close>
                        <button type='submit'
                            className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'>
                            <GameController size={24} />
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}