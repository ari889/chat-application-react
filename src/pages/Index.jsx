import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import avatar from '../assets/avatar.jpg'
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import Search from "../components/conversation/Search"
import ConversationLists from "../components/conversation/ConversationLists"

const Index = () => {
    return (
        <div className="m-3 border-2 border-gray-300 flex flex-row justify-normal items-start">
            <div className="p-3 w-1/4">
                <Search />
                <ConversationLists />
            </div>
            <div className="p-3 w-3/4">
                <div className="flex flex-row justify-start items-center">
                    <img src={avatar} className="rounded-full w-16 h-16" alt="" />
                    <div className="ml-3">
                        <a href="#" className="text-blue-600 font-semibold transition delay-75 hover:underline">Mr A</a>
                        <p>a@gmail.com</p>
                    </div>
                </div>
                <ul className="border rounded-sm p-3 mt-3 h-[calc(100vh_-_238px)] overflow-y-auto">
                    <li className="my-3 shadow-md table py-1 px-4 rounded-md text-left max-w-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, minus. Eum reiciendis ipsa vitae iusto molestias odio fuga dolore saepe placeat nam neque quae esse soluta deleniti voluptatibus ipsam amet maiores quidem, laborum, animi odit? Quo totam suscipit perferendis, quaerat atque repellendus perspiciatis accusantium consectetur debitis ducimus quasi facilis voluptatem dignissimos, qui modi, dolorum alias earum reprehenderit itaque sequi obcaecati eos. Libero officia sed corrupti dolor, aliquid ullam numquam eum consequatur tenetur voluptatum laborum illum voluptate praesentium blanditiis atque debitis, perferendis inventore, enim veritatis harum ipsa ipsam? Modi laborum perspiciatis veritatis aliquid similique aperiam quae quam. Ducimus repellendus facilis eum.</li>
                    <li className="my-3 table py-1 px-4 rounded-md bg-blue-500 text-white my-3 ml-auto max-w-lg">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus accusamus adipisci neque nostrum sit, exercitationem soluta obcaecati quo? Fuga sit cupiditate natus voluptas impedit provident, expedita ratione pariatur, quae ducimus nemo, at fugit quia odio mollitia? Veniam sunt quos nemo aliquam nulla vel, aut natus ratione alias saepe quis similique quaerat perferendis repellendus adipisci hic accusantium animi obcaecati dicta recusandae dolore quam tempore! Aliquam ullam, nesciunt sunt quo accusantium quaerat perspiciatis alias fuga consectetur provident harum architecto esse temporibus ad necessitatibus eveniet veritatis vero corporis, sit ducimus expedita quod perferendis neque asperiores? Iusto dicta adipisci numquam incidunt et deserunt aspernatur?</li>
                    <li className="my-3 shadow-md table py-1 px-4 rounded-md text-left max-w-lg">Hi</li>
                    <li className="my-3 shadow-md table py-1 px-4 rounded-md text-left max-w-lg">How are you?</li>
                    <li className="my-3 table py-1 px-4 rounded-md bg-blue-500 text-white my-3 ml-auto max-w-lg">Hi</li>
                </ul>
                <form action="" className="relative mt-3">
                    <input type="text" className="focus:outline-none border rounded-[3px] border-gray-300 px-3 py-1 w-full" />
                    <FontAwesomeIcon icon={faPaperPlane} className="text-gray-300 absolute top-1/2 right-5 -translate-y-1/2" />
                </form>
            </div>
        </div>
    )
}

export default Index