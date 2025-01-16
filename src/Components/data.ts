export type Event = {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    kidsPrice: number;
    adultPrice: number;
}

export type Events = Event[]

const  events: Events= [
    {
        id:1,
        title: 'Teej Party',
        date: '2023-08-01',
        time: '18:00',
        location: 'Teej, TN',
        description: 'Come join us for a fun-filled day of music and food!',
        kidsPrice: 10.00,
        adultPrice: 15.00,

    },
    {
        id:2,
        title:'Dashain Celebration',
        date: '2023-08-02',
        time: '18:00',
        location: 'Dashain, Nepal',
        description: 'Come join us for a fun-filled day of music and food!',
        kidsPrice: 10.00,
        adultPrice: 15.00,
    },
    {
        id:3,
        title:'Christmas Celebration',
        date: '2023-12-25',
        time: '18:00',
        location: 'Christmas, TN',
        description: 'Come join us for a fun-filled day of music and food!',
        kidsPrice: 10.00,
        adultPrice: 15.00,
    }
]
export default events;
