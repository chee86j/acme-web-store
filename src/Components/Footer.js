import React from "react"

const Footer = () => {
  return (
    <footer className="footer items-center bg-base-200 p-4">
      <div className="grid-flow-col items-center">
        <img
          className="h-12 w-12 rounded-lg"
          src="https://i.pinimg.com/originals/8a/9e/91/8a9e9112a2cf70b783ea4ef63a8d9e27.jpg"
          alt="logo"
        />
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://www.linkedin.com/in/jeffchee86/">
          <img
            className="avatar h-8 w-8 rounded-lg opacity-70 hover:scale-110 hover:opacity-100"
            src="https://media.licdn.com/dms/image/D4E35AQHx7nACFdbCfA/profile-framedphoto-shrink_200_200/0/1689122104998?e=1696096800&v=beta&t=VRS90TWQyAp4fciClfYHOAaNWIwc1o3Ez0USCo8-ypk"
            alt="Jeffrey Chee"
          />
        </a>
        <a href="https://www.linkedin.com/in/julian-bombard/">
          <img
            className="avatar h-8 w-8 rounded-lg opacity-70 hover:scale-110 hover:opacity-100"
            src="https://media.licdn.com/dms/image/C4E03AQE2vxtDjubbHg/profile-displayphoto-shrink_800_800/0/1583358605195?e=1700697600&v=beta&t=BIh35Zy9saW5ZYu478PWz-3NPU0_ZUob8JLUkrkDT3E"
            alt="Julian Bombard"
          />
        </a>
        <a href="https://www.linkedin.com/in/scottweaverdev/">
          <img
            className="avatar h-8 w-8 rounded-lg opacity-70 hover:scale-110 hover:opacity-100"
            src="https://media.licdn.com/dms/image/D5635AQHjHjrw40lOYg/profile-framedphoto-shrink_800_800/0/1689600962592?e=1696100400&v=beta&t=feGF0H2YEXE5zh_VjT6gFsuU6ZLkT5TAMmokU9Hcib8"
            alt="Scott Weaver"
          />
        </a>
        <a href="https://www.linkedin.com/in/calvin-driesner/">
          <img
            className="avatar h-8 w-8 rounded-lg opacity-70 hover:scale-110 hover:opacity-100"
            src="https://i0.wp.com/www.natureswaycolonic.co.uk/wp-content/uploads/2018/10/avatar-anonymous-300x300.png?resize=300%2C300"
            alt="Calvin Dreisner"
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer
