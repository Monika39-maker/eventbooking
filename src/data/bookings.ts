export type Booking = {
    event:string,
    guestName: string,
    numberOfKids: number,
    numberOfAdults: number,
    id: number
}

export type Bookings = Booking[]

const  bookings: Bookings= [
    {
        event: 'Teej Party',
        guestName: 'John Doe',
        numberOfKids: 2,
        numberOfAdults: 1,
        id: 1
    },
    {
        event: 'Teej Party',
        guestName: 'Madhuri Dixit',
        numberOfKids: 2,
        numberOfAdults: 1,
        id: 2
    },
    {
        event: 'Teej Party',
        guestName: 'Rita Shrestha',
        numberOfKids: 2,
        numberOfAdults: 1,
        id: 3
    },
    {
        event: 'Dashain Celebration',
        guestName: 'Jane Doe',
        numberOfKids: 1,
        numberOfAdults: 2,
        id: 4
    },
    {
        event: 'Dashain Celebration',
        guestName: 'Chrish Doe',
        numberOfKids: 5,
        numberOfAdults: 2,
        id: 4
    },
    {
        event: 'Christmas Celebration',
        guestName: 'John Smith',
        numberOfKids: 3,
        numberOfAdults: 2,
        id: 3
    }
    
]
export default bookings;

