import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  header: { fontSize: 18, marginBottom: 20 },
  item: { fontSize: 12, marginBottom: 5 },
});

interface StockItem {
  product: string;
  quantity: number;
  price: string;
}

interface DefaultReportProps {
  data: StockItem[];
}

const DefaultReport: React.FC<DefaultReportProps> = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Relatório de Estoque</Text>
      </View>
      {data.map((item, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.item}>Produto: {item.product}</Text>
          <Text style={styles.item}>Quantidade: {item.quantity}</Text>
          <Text style={styles.item}>Preço: {item.price}</Text>
        </View>
      ))}
    </Page>
  </Document>

);

export default DefaultReport;
