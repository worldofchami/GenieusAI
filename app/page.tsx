import Link from "next/link";
import { Button } from "./(util)/components";

export default async function Page() {
	return (
		<>
		<div className="w-full h-full flex flex-col justify-center gap-y-4 text-center">
			<h1 className="text-9xl">🧞‍♂️</h1>
			<h1 className="text-3xl">Welcome to Genieus!</h1>
			<span className="mb-8 text-contrastlt">Your personal AI genie in the form of a Chrome extension. You can also use Genieus through your browser.</span>
			<Link href="/chat">
				<Button>
					Chat
				</Button>
			</Link>
			<Link href="https://github.com/worldofchami/GenieusAI" target="_blank">
				<Button className="bg-secAccent">
					GitHub
				</Button>
			</Link>
			<a href="mailto:tinochaminuka@gmail.com">
				<Button className="bg-transparent glass">
					Contact
				</Button>
			</a>
		</div>
		</>
	)
}