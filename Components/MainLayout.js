import Header from "./infoComponent/Headers";

export function MainLayout({children, withHeader}) {
    return (
        <>
            <main>
                {children}
            </main>
        </>
    )
}

// это наш костяк в который мы обворачиваем все компоненты что бы была однотипная стилизация каркаса нашего проекта/
