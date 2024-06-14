import { BarChartIcon, CalendarIcon } from "@radix-ui/react-icons"
import { AiOutlineStock } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSync } from "react-icons/ai";
import { MdOutlineSecurity } from "react-icons/md";

export function LandingPageAbout() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container space-y-12 px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                            Recursos e Funcionalidades
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Tudo que você precisa para gerenciar seu estoque
                        </h2>
                        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Nosso sistema de controle de estoque oferece uma variedade de recursos para te ajudar a
                            gerenciar seu inventário de forma eficiente.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                    <div className="grid gap-1">
                        <CalendarIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                        <h3 className="text-lg font-bold">Registro de Entrada e Saída</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Registre as entradas e saídas de produtos de forma fácil e intuitiva.
                        </p>
                    </div>
                    <div className="grid gap-1">
                        <BarChartIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                        <h3 className="text-lg font-bold">Relatórios e Gráficos</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Visualize seu inventário em gráficos e relatórios personalizados.
                        </p>
                    </div>
                    <div className="grid gap-1">
                        <AiOutlineStock className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                        <h3 className="text-lg font-bold">Gerenciamento de Produtos</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Organize e gerencie seus produtos com facilidade.
                        </p>
                    </div>
                    <div className="grid gap-1">
                        <IoMdNotificationsOutline className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                        <h3 className="text-lg font-bold">Alertas e Notificações</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receba alertas sobre níveis baixos de estoque, vencimentos e mais.
                        </p>
                    </div>
                    <div className="grid gap-1">
                        <AiOutlineSync className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                        <h3 className="text-lg font-bold">Sincronização Automática</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Sincronize seu inventário com outros sistemas de gestão.
                        </p>
                    </div>
                    <div className="grid gap-1">
                        <MdOutlineSecurity className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                        <h3 className="text-lg font-bold">Segurança e Privacidade</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Seus dados de inventário são protegidos com criptografia e armazenados de forma segura.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
