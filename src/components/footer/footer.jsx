import React from "react";
export default function footer() {
    return (
        <div>


            <footer class="bg-gray-700 dark:bg-gray-900">
                <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div class="md:flex md:justify-between">
                        <div class="mb-6 md:mb-0">
                            <a href="https://flowbite.com/" class="flex items-center">
                                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" />
                                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Postolio</span>
                            </a>
                        </div>
                        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                            <div>
                                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                    <li class="mb-4">
                                        <a href="https://flowbite.com/" class="hover:underline">Flowbite</a>
                                    </li>
                                    <li>
                                        <a href="https://tailwindcss.com/" class="hover:underline">Tailwind CSS</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                    <li class="mb-4">
                                        <a href="https://github.com/themesberg/flowbite" class="hover:underline ">Github</a>
                                    </li>
                                    <li>
                                        <a href="https://discord.gg/4eeurUVvTy" class="hover:underline">Discord</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                                <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                    <li class="mb-4">
                                        <a href="#" class="hover:underline">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" class="hover:underline">Postolio™</a>. All Rights Reserved.
                        </span>
                        <div class="flex mt-4 sm:justify-center sm:mt-0">


                        <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <a href="https://www.youtube.com/" className="text-blue-500 hover:text-blue-700">
                                    <i className="fab fa-youtube text-2xl"></i>
                                </a>
                            </a>



                            <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <a href="https://www.linkedin.com/in/ishant9582/" className="text-blue-500 hover:text-blue-700">
                                    <i className="fab fa-linkedin text-2xl"></i>
                                </a>
                            </a>



                            <a href="" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                                <a href="https://www.instagram.com/ishant95827/" className="text-blue-500 hover:text-blue-700">
                                    <i className="fab fa-instagram text-2xl"></i>
                                </a>
                            </a>

  

                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}