import clsx from "clsx";
import { useParams } from "wouter";

import { Masthead } from "@/components/masthead";
import { Button } from "@/components/ui/button";
import { CardViewCards } from "@/pages/card-view/card-view-cards";
import { useStore } from "@/store";
import { selectCardWithRelations } from "@/store/selectors/card-view";
import { useDocumentTitle } from "@/utils/use-document-title";

import css from "./card-view.module.css";

function CardView() {
  const { code } = useParams();

  const cardWithRelations = useStore((state) =>
    selectCardWithRelations(state, code, true),
  );

  useDocumentTitle(
    cardWithRelations ? `${cardWithRelations.card.real_name}` : undefined,
  );

  if (!cardWithRelations) return null;

  return (
    <div className={clsx(css["layout"])}>
      <Masthead className={css["header"]} />
      <main className={css["main"]}>
        <nav className={css["actions"]}>
          <Button
            as="a"
            href={`https://arkhamdb.com/card/${cardWithRelations.card.code}`}
            rel="noreferrer"
            target="_blank"
          >
            <i className="icon-world" /> Open on ArkhamDB
          </Button>
        </nav>
        <CardViewCards
          cardWithRelations={cardWithRelations}
          key={cardWithRelations.card.code}
        />
      </main>
    </div>
  );
}

export default CardView;
