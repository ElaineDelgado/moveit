import { useContext } from 'react'
import { ChallangesContext } from '../contexts/ChallangesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level } = useContext(ChallangesContext)
    return (
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/69869482?s=460&u=249ec9213420cf936374888826c7e0c3f17c2bdc&v=4" alt="Foto do usuário."/>
            <div>
                <strong> Elaine Delgado</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level { level }
                </p>
            </div>            
        </div>
    )
}