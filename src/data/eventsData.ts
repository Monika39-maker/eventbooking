export type Event = {
    id: number;
    title: string;
    date: string;
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
       
        location: 'Teej, TN',
        description: 'Come join us for a fun-filled day of music and food!',
        kidsPrice: 10.00,
        adultPrice: 15.00,

    },
    {
        id:2,
        title:'Dashain Celebration',
        date: '2023-08-02',
        location: 'Dashain, Nepal',
        description: 'Enjoy a day of music, food, and celebration!',
        kidsPrice: 10.00,
        adultPrice: 15.00,
    },
    {
        id:3,
        title:'Christmas Celebration',
        date: '2023-12-25',
        location: 'Christmas, TN',
        description: 'Let celebrate together',
        kidsPrice: 10.00,
        adultPrice: 15.00,
    }
]
export default events;

