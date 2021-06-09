

const briefcase = ({ ...props }) => {
    return (

    <svg 
        width="25" 
        height="24" 
        viewBox="0 0 25 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        {...props}
    >
        <path d="M20.1574 6.98453H4.12165C3.01462 6.98453 2.11719 7.85457 2.11719 8.92783V18.6443C2.11719 19.7176 3.01462 20.5876 4.12165 20.5876H20.1574C21.2644 20.5876 22.1618 19.7176 22.1618 18.6443V8.92783C22.1618 7.85457 21.2644 6.98453 20.1574 6.98453Z" stroke="#E02041" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.1477 20.5876V5.04123C16.1477 4.52583 15.9366 4.03155 15.5606 3.66711C15.1847 3.30267 14.6749 3.09793 14.1433 3.09793H10.1343C9.60273 3.09793 9.09289 3.30267 8.71698 3.66711C8.34107 4.03155 8.12988 4.52583 8.12988 5.04123V20.5876" stroke="#E02041" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    )
}

class icons{
    briefcase(...props){
        return (

            <svg 
                width="25" 
                height="24" 
                viewBox="0 0 25 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                {...props}
            >
                <path d="M20.1574 6.98453H4.12165C3.01462 6.98453 2.11719 7.85457 2.11719 8.92783V18.6443C2.11719 19.7176 3.01462 20.5876 4.12165 20.5876H20.1574C21.2644 20.5876 22.1618 19.7176 22.1618 18.6443V8.92783C22.1618 7.85457 21.2644 6.98453 20.1574 6.98453Z" stroke="#E02041" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.1477 20.5876V5.04123C16.1477 4.52583 15.9366 4.03155 15.5606 3.66711C15.1847 3.30267 14.6749 3.09793 14.1433 3.09793H10.1343C9.60273 3.09793 9.09289 3.30267 8.71698 3.66711C8.34107 4.03155 8.12988 4.52583 8.12988 5.04123V20.5876" stroke="#E02041" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        
            )
    }
}

export default briefcase