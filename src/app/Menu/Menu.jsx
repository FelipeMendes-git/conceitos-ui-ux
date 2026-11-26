import { useEffect, useState } from 'react'
import { categories, concepts, findConcept } from '../catalog.js'
import { isReady } from '../pages.js'
import { Link } from '../router.jsx'
import styles from './Menu.module.css'

/*
 * O menu do guia. Ele não sabe em que tela está nem que aparência deve ter:
 * usa só as variáveis --menu-*, e cada tela decide o valor delas.
 */
export default function Menu({ currentPath, onNavigate }) {
  const current = findConcept(currentPath)
  const currentCategoryId = current?.category.id

  // Quais grupos estão abertos. Começa pelo grupo da tela atual
  // (ou pelo primeiro, na página inicial).
  const [openGroups, setOpenGroups] = useState(
    () => new Set([currentCategoryId ?? categories[0].id]),
  )

  // Chegou a uma tela de outro grupo (pelo botão voltar, por exemplo)?
  // Abre esse grupo, sem fechar os que a pessoa já tinha aberto.
  useEffect(() => {
    if (!currentCategoryId) return
    setOpenGroups((open) =>
      open.has(currentCategoryId) ? open : new Set(open).add(currentCategoryId),
    )
  }, [currentCategoryId])

  function toggleGroup(id) {
    setOpenGroups((open) => {
      const next = new Set(open)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const readyCount = concepts.filter(
    (concept) => !concept.category.devOnly && isReady(concept.key),
  ).length
  const totalCount = concepts.filter((concept) => !concept.category.devOnly).length

  return (
    <nav id="menu" className={styles.menu} aria-label="Conceitos do guia">
      <Link
        to="/"
        className={styles.brand}
        aria-current={currentPath === '/' ? 'page' : undefined}
        onClick={onNavigate}
      >
        <span className={styles.brandName}>Conceitos</span>
        <span className={styles.brandTag}>UI/UX · guia visual</span>
      </Link>

      <ul className={styles.groups}>
        {categories.map((category) => {
          const isOpen = openGroups.has(category.id)
          const panelId = `menu-${category.id}`
          const built = category.items.filter((item) =>
            isReady(`${category.id}/${item.slug}`),
          ).length

          return (
            <li key={category.id} className={styles.group}>
              <h2 className={styles.groupHeading}>
                <button
                  type="button"
                  className={styles.groupButton}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleGroup(category.id)}
                >
                  <span className={styles.groupNumber}>{category.number}</span>
                  <span className={styles.groupTitle}>{category.title}</span>
                  <span className={styles.groupCount}>
                    <span aria-hidden="true">
                      {built}/{category.items.length}
                    </span>
                    <span className="sr-only">
                      {built} de {category.items.length} telas prontas
                    </span>
                  </span>
                </button>
              </h2>

              <ul id={panelId} className={styles.items} hidden={!isOpen}>
                {category.items.map((item) => {
                  const path = `/${category.id}/${item.slug}`
                  const ready = isReady(`${category.id}/${item.slug}`)

                  return (
                    <li key={item.slug}>
                      {ready ? (
                        <Link
                          to={path}
                          className={styles.item}
                          aria-current={currentPath === path ? 'page' : undefined}
                          onClick={onNavigate}
                        >
                          {item.title}
                        </Link>
                      ) : (
                        // Tela ainda não construída: texto apagado, sem link.
                        <span className={`${styles.item} ${styles.itemSoon}`}>
                          {item.title}
                          <span className="sr-only"> (em breve)</span>
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>

      <p className={styles.footer}>
        Em construção
        <br />
        {readyCount} de {totalCount} telas prontas
      </p>
    </nav>
  )
}
