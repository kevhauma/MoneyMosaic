import { useHistory } from "@/feature-data-store"
import { HistoryListItem } from "./HistoryEntryListItem"

export const HistoryList = () => {
  const {getHistory} = useHistory()
  return getHistory().map((entry)=><HistoryListItem entry={entry}/>)
}