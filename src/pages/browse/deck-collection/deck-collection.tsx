import { Ellipsis, Plus, Trash2, Upload } from "lucide-react";
import { Link } from "wouter";

import { DeckSummary } from "@/components/deck-summary";
import { DeckTags } from "@/components/deck-tags";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Scroller } from "@/components/ui/scroller";
import { useStore } from "@/store";
import { selectLocalDecks } from "@/store/selectors/decks";

import css from "./deck-collection.module.css";

import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/toast";
import { useCallback, useState } from "react";
import { DeckCollectionImport } from "./deck-collection-import";

export function DeckCollection() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const decks = useStore(selectLocalDecks);

  const importDecks = useStore((state) => state.importFromFiles);
  const deleteAllDecks = useStore((state) => state.deleteAllDecks);
  const toast = useToast();

  const onAddFiles = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const files = evt.target.files;
      if (files?.length) {
        importDecks(files);
        setPopoverOpen(false);
      }
    },
    [importDecks],
  );

  const onDeleteAll = useCallback(async () => {
    const confirmed = confirm(
      "Are you sure you want to delete all local decks in your collection?",
    );

    if (confirmed) {
      setPopoverOpen(false);
      await deleteAllDecks(toast);
    }
  }, [deleteAllDecks, toast]);

  return (
    <div className={css["container"]}>
      <header className={css["header"]}>
        <h2 className={css["title"]}>Decks</h2>
        <div className={css["actions"]}>
          <Popover>
            <DeckCollectionImport />
          </Popover>
          <Link asChild to="/deck/create">
            <Button
              as="a"
              data-testid="collection-create-deck"
              tooltip="Create new deck"
            >
              <Plus />
            </Button>
          </Link>
          <Popover onOpenChange={setPopoverOpen} open={popoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="bare"
                data-testid="collection-more-actions"
                tooltip="More actions"
              >
                <Ellipsis />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <DropdownMenu>
                <Button
                  as="label"
                  data-testid="collection-import-file"
                  htmlFor="collection-import"
                  size="full"
                  variant="bare"
                >
                  <Upload /> Import from JSON files
                </Button>
                <input
                  id="collection-import"
                  type="file"
                  accept="application/json"
                  className={css["import-input"]}
                  multiple
                  onChange={onAddFiles}
                />
                <Button
                  as="label"
                  data-testid="collection-delete-all"
                  onClick={onDeleteAll}
                  size="full"
                  variant="bare"
                >
                  <Trash2 /> Delete all local decks
                </Button>
              </DropdownMenu>
            </PopoverContent>
          </Popover>
        </div>
      </header>
      {decks.length ? (
        <Scroller>
          <ol className={css["decks"]}>
            {decks.map((deck) => (
              <li
                className={css["deck"]}
                data-testid="collection-deck"
                key={deck.id}
              >
                <Link href={`/deck/view/${deck.id}`}>
                  <DeckSummary
                    deck={deck}
                    interactive
                    showThumbnail
                    validation={deck.problem}
                  >
                    {deck.tags && <DeckTags tags={deck.tags} />}
                  </DeckSummary>
                </Link>
              </li>
            ))}
          </ol>
        </Scroller>
      ) : (
        <div className={css["placeholder-container"]}>
          <figure className={css["placeholder"]}>
            <i className="icon-deck" />
            <figcaption className={css["placeholder-caption"]}>
              Collection empty
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
