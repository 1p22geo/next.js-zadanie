import Link from 'next/link';
import React from 'react';
class Sample extends React.Component {
    constructor(props) {
        super(props);
        this.state = { result: [] }
    }
    componentDidMount() {
        fetch("http://localhost:3000/api/sample", {
            method: "GET"
        }).then(res => {
            res.json().then(r_json => {
                this.setState(r_json)
            })
        });
    }
    render() {
        console.log(this.state)
        return (<>
            <div className="rounded-xl bg-[#E5E5E5] mt-10 border-[#FCA311] border-b-8 w-[70rem] flex flex-wrap  border-collapse">
                <h1 key={1} className="text-2xl font-bold mb-3 p-5 border-[#FCA311] border-b-8 w-full">
                    Some of our movies:
                </h1>
                {this.state.result.map((record, n) => {
                    return (
                        <Link href={'/login_page'} key={n + 3} className=" hover:bg-[#FCA311] p-3 px-6 box-border w-1/4 group border-black border-b overscroll-none">
                            <h4 className='font-bold text-l'>{record.title}</h4>
                            <p className='h-24'>{record.description.slice(0, 100) + (((record.description.length) > 100) ? '...' : '')}</p>
                            <img src={record.image} className={'py-5'} />
                            <div className=''>
                                <div className='overflow-auto h-32'>
                                    <h4 className='font-bold text-l'>Genres:</h4>
                                    <ul className='list-disc list-inside'>
                                        {record.genre.map((genre) => { return <li key={genre}>{genre}</li> })}
                                    </ul>
                                    <h4 className='font-bold text-l'>Starring:</h4>
                                    <ul className='list-disc list-inside'>
                                        {record.starring.map((genre) => { return <li key={genre}>{genre}</li> })}
                                    </ul>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>)
    }
}

export default Sample;