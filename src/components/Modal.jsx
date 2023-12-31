import { useEffect, useState } from 'react'
import isValidEmail from '../utils/isValidEmail';
import { useGetUserQuery } from '../features/users/UsersApi';
import { useDispatch, useSelector } from 'react-redux';
import { conversationsApi, useAddConversationMutation, useEditConversationMutation } from '../features/conversations/conversationsApi';

const Modal = ({ open, control }) => {
    /**
     * send message to
     */
    const [to, setTo] = useState("");

    /**
     * messaage
     */
    const [message, setMessage] = useState("");

    /**
     * user check query handle using state
     */
    const [userCheck, setUserCheck] = useState(false);

    /**
     * get logged in user
     */
    const { user: loggedInUser } = useSelector(state => state.auth) || {};

    /**
     * get logged in user email
     */
    const { email: myEmail } = loggedInUser || {};

    /**
     * get dispatch hook
     */
    const dispatch = useDispatch();

    /**
     * response error state
     */
    const [responseError, setResponseError] = useState("");

    /**
     * conversation state
     */
    const [conversation, setConversation] = useState(undefined);

    /**
     * get user query
     */
    const { data: participant } = useGetUserQuery(to, {
        skip: !userCheck
    });

    /**
     * add conversation hook
     */
    const [addConversation, { isSuccess: isAddConversationSuccess }] = useAddConversationMutation();
    const [editConversation, { isSuccess: isEditConversationSuccess }] = useEditConversationMutation();

    /**
     * get coppesponding conversation if user find
     */
    useEffect(() => {
        if (participant?.length > 0 && participant[0].email !== myEmail) {
            /**
             * check conversation exists
             */
            dispatch(
                conversationsApi.endpoints.getConversation.initiate({
                    userEmail: myEmail,
                    participantEmail: to
                })
            )
                .unwrap()
                .then((data) => {
                    setConversation(data?.conversations)
                })
                .catch((err) => {
                    setResponseError("There was a problem!");
                })
        }
    }, [participant, dispatch, myEmail, to]);

    /**
     * debounce handler
     */
    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args);
            }, delay)
        }
    }

    /**
     * search hanndler function
     */
    const doSearch = (value) => {
        if (isValidEmail(value)) {
            setUserCheck(true);
            setTo(value);
        }
    }

    /**
     * handle email search
     */
    const handleSearch = debounceHandler(doSearch, 500);

    /**
     * handle submit
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        /**
         * check message is blank or not
         */
        if (message == '' && email == '') {
            setResponseError("Please write an message or email!");
        } else {
            /**
             * edit conversation if exists
             */
            if (conversation?.length > 0) {
                editConversation({
                    id: conversation[0]._id,
                    data: {
                        participants: `${myEmail}-${participant[0].email}`,
                        users: [loggedInUser._id, participant[0]._id],
                        message,
                        timestamp: new Date().getTime()
                    },
                    sender: loggedInUser,
                    receiver: participant[0],
                });
            } else if (conversation?.length === 0) {
                addConversation({
                    sender: loggedInUser.email,
                    data: {
                        participants: `${myEmail}-${participant[0].email}`,
                        users: [loggedInUser._id, participant[0]._id],
                        message,
                        timestamp: new Date().getTime()
                    }
                });
            }
        }
    }

    /**
     * listen add conversation is success or failed
     */
    useEffect(() => {
        if (isAddConversationSuccess || isEditConversationSuccess) {
            control();
        }
    }, [isAddConversationSuccess, isEditConversationSuccess]);

    return open && (
        <>
            <div
                onClick={control}
                className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
            ></div>
            <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Send message
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="to" className="sr-only">
                                To
                            </label>
                            <input
                                id="to"
                                name="to"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Send to"
                                onChange={e => handleSearch(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="sr-only">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                type="text"
                                required
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Message"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        >
                            Send Message
                        </button>
                    </div>

                    {/* {participant?.length === 0 && <Error message="This user doesn't exists!" />} */}
                    {/* {responseError && <Error message={responseError} />} */}
                </form>
            </div>
        </>
    )
}

export default Modal