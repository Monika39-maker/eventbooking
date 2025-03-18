export interface Event {
    id?: number;
    title: string;
    date: string;
    location: string;
    description: string;
    kids_price: number;
    adult_price: number;
}

export type Events = Event[];

const events: Events = [
    {
        id: 1,
        title: 'Teej Party',
        date: '2023-08-01',
        location: 'Teej, TN',
        description: 'Come join us for a fun-filled day of music and food!',
        kids_price: 10.00,
        adult_price: 15.00,
    },
    {
        id: 2,
        title: 'Dashain Celebration',
        date: '2023-08-02',
        location: 'Dashain, Nepal',
        description: 'Enjoy a day of music, food, and celebration!',
        kids_price: 10.00,
        adult_price: 15.00,
    },
    {
        id: 3,
        title: 'Christmas Celebration',
        date: '2023-12-25',
        location: 'Christmas, TN',
        description: 'Let celebrate together',
        kids_price: 10.00,
        adult_price: 15.00,
    }
]
export default events;
